import { OpenAI } from 'langchain/llms/openai';

// Bootstrap the proxy, as OpenAI cannot be accessed in China due to GFW.
import './proxy-bootstrap.js';

const OPENAI_API_KEY = '<your_openai_api_key>';

export const model = new OpenAI({
  openAIApiKey: OPENAI_API_KEY,
  temperature: 0,
  maxTokens: 1024,
});

export const translate = async (
  text: string,
  type: 'course-name' | 'project-name' | 'paper-title' = 'paper-title',
) => {
  const prompt = `将下面这个${
    type === 'course-name'
      ? '课程名称'
      : type === 'project-name'
      ? '项目名称'
      : '论文标题'
  }翻译成英文，不要包含任何多余字符`;

  const result = await model.call(`${prompt}：${text}`);

  return result
    .replace(/[\u4e00-\u9fa5]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
};
