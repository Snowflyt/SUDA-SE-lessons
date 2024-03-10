<script lang="ts">
  import { getProxyURL, setProxyURL } from '@/utils/request';

  let backendURL = getProxyURL();
</script>

<div
  class="flex h-full w-full flex-col items-start justify-start space-y-1 p-4">
  <h1 class="mb-2 text-xl font-semibold">设置</h1>
  <label class="space-y-1">
    <span class="text-base font-semibold">后端地址</span>
    <input
      class="w-full rounded-sm border p-1 text-sm focus:border-blue-500 focus:outline-none"
      type="text"
      value={backendURL}
      on:change={(e) => {
        backendURL = e.currentTarget.value;
        setProxyURL(backendURL);
      }} />
  </label>
</div>
