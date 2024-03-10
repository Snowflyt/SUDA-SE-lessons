<script lang="ts">
  import { onDestroy } from 'svelte';

  import nerApi from '@/apis/ner';

  import type { NERTag } from '@/apis/ner';

  let syncClipboard = false;
  let text = '';
  let justCopied = false;

  // eslint-disable-next-line no-undef
  const interval = setInterval(async () => {
    if (syncClipboard) {
      // eslint-disable-next-line no-undef
      text = await navigator.clipboard.readText();
    }
  }, 500);

  onDestroy(() => {
    // eslint-disable-next-line no-undef
    clearInterval(interval);
  });

  const handleCopy = (phrase: string) => {
    // eslint-disable-next-line no-undef
    void navigator.clipboard.writeText(phrase);
    justCopied = true;
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      justCopied = false;
    }, 500);
  };

  const translateNERType = (type: 'ns' | 'nt' | 'nr') => {
    switch (type) {
      case 'ns':
        return '地理位置';
      case 'nt':
        return '机构团体';
      case 'nr':
        return '人名';
      default:
        return '未知';
    }
  };

  const processData = (data: Array<[string, NERTag]>) => {
    let last: { type: 'ns' | 'nt' | 'nr' | 'O'; phrase: string };
    const result: Array<typeof last> = [];
    for (const item of data) {
      const [char, tag] = item;
      let type: 'ns' | 'nt' | 'nr' | 'O' = 'O';
      if (tag !== 'O') {
        type = tag.slice(2) as 'ns' | 'nt' | 'nr';
      }
      if (!last || last.type !== type) {
        last = { type, phrase: char };
        result.push(last);
      } else {
        last.phrase += char;
      }
    }
    return result;
  };
</script>

<div
  class="flex h-full w-full flex-col items-start justify-start space-y-1 p-2">
  <label class="text-sm"
    ><input type="checkbox" class="h-3 w-3" bind:checked={syncClipboard} /> 同步剪贴板</label>
  <textarea
    class="h-1/2 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
    placeholder="请输入文本"
    bind:value={text} />
  {#if text !== ''}
    {#await nerApi.predict(text)}
      <div class="text-sm text-gray-500">加载中...</div>
    {:then data}
      <div class="text-sm text-gray-500">
        {#each processData(data) as { phrase, type }}
          {#if type === 'O'}
            {phrase}
          {:else}
            <span
              class="tooltip mx-1 underline-offset-4 hover:cursor-pointer"
              on:click={() => handleCopy(phrase)}
              on:keyup={(e) => {
                if (e.key === 'Enter') handleCopy(phrase);
              }}>
              <div class="tooltip-text">
                {justCopied ? '已复制' : translateNERType(type)}
              </div>
              <u
                class={type === 'ns'
                  ? 'text-green-800 decoration-green-600 '
                  : type === 'nt'
                  ? 'text-orange-800 decoration-orange-600'
                  : 'text-blue-800 decoration-blue-600'}>{phrase}</u
              ></span>
          {/if}
        {/each}
      </div>
    {:catch error}
      <div class="text-sm text-gray-500">{error.message}</div>
    {/await}
  {/if}
</div>

<style>
  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }

  /* Tooltip text */
  .tooltip .tooltip-text {
    visibility: hidden;
    width: 80px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    top: -35px;
    left: 50%;
    margin-left: -40px;
    background-color: rgba(0, 0, 0, 0.75);

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 100;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltip-text {
    visibility: visible;
  }

  .tooltip .tooltip-text::after {
    content: ' ';
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
  }
</style>
