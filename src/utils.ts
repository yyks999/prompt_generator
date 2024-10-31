import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ky from 'ky'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCodeBlocksContent(markdown: string) {
  const codeBlocksRegex =
    /(?:```([a-zA-Z0-9]+)?\s*([\s\S]*?)\s*```|```([a-zA-Z0-9]+)?\s*([\s\S]+?)\s*```)(?![^`]*```)|```([a-zA-Z0-9]+)?\s*([\s\S]+)/gm;
  let match;
  const codeBlocksContent = [];
  while ((match = codeBlocksRegex.exec(markdown))) {
    // Select the first non empty capture group
    const codeBlockContent =
      match[6] || match[5] || match[4] || match[3] || match[2] || match[1];
    if (codeBlockContent) {
      codeBlocksContent.push(codeBlockContent);
    }
  }
  return codeBlocksContent;
}


export function fetchApi(
  url: string,
  method: "post" | "get",
  body: any = undefined,
  headersOpts: any = undefined,
) {
  let defaultHeaders = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  if (headersOpts) {
    defaultHeaders = {
      ...defaultHeaders,
      ...headersOpts,
    };
  }

  return ky(url, {
    method,
    headers: defaultHeaders,
    body: JSON.stringify(body),
    timeout: false
  }).then((response) => response);
}

export function errMessage(
  message: string | number,
  language: 'chinese' | 'english' | 'japanese',
) {
  if (typeof message === "number") {
    let messageHTML = message.toString();
    const href = import.meta.env.VITE_APP_REGION ? import.meta.env.VITE_APP_OFFICIAL_WEBSITE_URL_GLOBAL : import.meta.env.VITE_APP_OFFICIAL_WEBSITE_URL_CHINA
    switch (message) {
      case -10001:
        messageHTML = language === 'chinese'
          ? "账户凭证丢失，请 <a style='text-decoration: underline; color: #0070f0' href='/auth'>重新登录</a>"
          : language === 'japanese'
            ? "アカウント資格情報が失われました。<a style='text-decoration: underline; color: #0070f0' href='/auth'>再度ログイン</a> してください"
            : "Account credentials lost, Please <a style='text-decoration: underline; color: #0070f0' href='/auth'>log in again</a>";
        break;
      case -10002:
        messageHTML = language === 'chinese'
          ? `该工具已禁用/删除，更多请访问 <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a>`
          : language === 'japanese'
            ? `このツールは無効化されました。詳細については <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> をご覧ください。`
            : `This tool is disabled / deleted, Please refer to <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> for details.`;
        break;
      case -10003:
        messageHTML = language === 'chinese'
          ? "网络错误，请稍后重试"
          : language === 'japanese'
            ? "ネットワークエラーが発生しました。後でもう一度お試しください。"
            : "Network error, please try again later.";
        break;
      case -10004:
        messageHTML = language === 'chinese'
          ? `账户余额不足，创建属于自己的工具，更多请访问 <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a>`
          : language === 'japanese'
            ? `アカウントの残高が不足しています。詳細については <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> をご覧ください。`
            : `Insufficient account balance, Please view <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> to create your own tools.`;
        break;
      case -10005:
        messageHTML = language === 'chinese'
          ? "账户凭证过期，请 <a style='text-decoration: underline; color: #0070f0' href='/auth'>重新登录</a>"
          : language === 'japanese'
            ? "アカウント資格情報の有効期限が切れました。<a style='text-decoration: underline; color: #0070f0' href='/auth'>再度ログイン</a> してください"
            : "Account credentials expired, Please <a style='text-decoration: underline; color: #0070f0' href='/auth'>log in again</a>";
        break;
      case -10006:
        messageHTML = language === 'chinese'
          ? `账户总额度已达上限，更多请访问 <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a>`
          : language === 'japanese'
            ? `アカウントの総クォータが上限に達しました。詳細については <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a> をご覧ください。`
            : `This tool's total quota reached maximum limit, Please refer to <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a> for details.`;
        break;
      case -10007:
        messageHTML = language === 'chinese'
          ? `账户日额度已达上限，更多请访问 <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a>`
          : language === 'japanese'
            ? `アカウントの日次クォータが上限に達しました。詳細については <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a> をご覧ください。`
            : `This tool's daily quota reached maximum limit, Please refer to <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a> for details.`;
        break;
      case -10008:
        messageHTML = language === 'chinese'
          ? `当前无可用通道，更多请访问 <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a>`
          : language === 'japanese'
            ? `現在利用できるチャンネルはありません。詳細については <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> をご覧ください。`
            : `No available channels at the moment, Please refer to <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> for details.`;
        break;
      case -10009:
        messageHTML = language === 'chinese'
          ? `不支持当前API功能，更多请访问 <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a>`
          : language === 'japanese'
            ? `現在のAPI機能はサポートされていません。詳細については <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> をご覧ください。`
            : `API function is not supported, Please refer to <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> for details.`;
        break;
      case -10012:
        messageHTML = language === 'chinese'
          ? `该免费工具在本小时的额度已达上限，请访问 <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a> 生成属于自己的工具`
          : language === 'japanese'
            ? `この無料ツールは今時間の上限に達しました。 <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a> を訪問して自分のツールを作成してください`
            : `This free tool's hour quota reached maximum limit. Please view <a style='color:#0070f0;text-decoration:underline' href=${href} target='_blank'>302.AI</a> to create your own tool`;
        break;
      case -1024:
        messageHTML = language === 'chinese'
          ? `AI接口连接超时，更多请访问 <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a>`
          : language === 'japanese'
            ? `AIインターフェース接続がタイムアウトしました。詳細については <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> をご覧ください。`
            : `AI interface connection timed out, Please refer to <a style='text-decoration: underline; color: #0070f0' href=${href} target='_blank'>302.AI</a> for details.`;
        break;
      default:
        messageHTML = "Unknown error";
    }
    return messageHTML;
  }
  return message;
}