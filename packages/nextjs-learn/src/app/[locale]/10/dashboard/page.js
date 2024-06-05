import { Suspense } from "react";
import { sleep } from "@/lib/utils";

async function PostFeed() {
  await sleep(2000);
  return <h1>Hello PostFeed</h1>;
}

async function Weather() {
  await sleep(8000);
  return <h1>Hello Weather</h1>;
}

async function Recommend() {
  await sleep(5000);
  return <h1>Hello Recommend</h1>;
}

export default function Dashboard() {
  return (
    <section style={{ padding: "20px" }}>
      <Suspense fallback={<p>Loading PostFeed Component</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading Weather Component</p>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<p>Loading Recommend Component</p>}>
        <Recommend />
      </Suspense>
    </section>
  );
}

// 查看 dashboard 请求的响应头发现：Transfer-Encoding 标头的值为 chunked，表示数据将以一系列分块的形式进行发送。
// 说明使用了 Suspense 后开启了 Streaming Server Rendering（流式渲染）：从服务器到客户端渐进式渲染 HTML
// Streaming 可以有效的阻止耗时长的数据请求阻塞整个页面加载的情况。它还可以减少加载第一个字节所需时间（TTFB）和首次内容绘制（FCP），有助于缩短可交互时间（TTI），尤其在速度慢的设备上。

// 实现 Streaming 有两种方式：
// 1. 页面级别，使用 loading.jsx
// 2. 特定组件，使用 <Suspense>

// 而且，当多个页面复用一个 loading.jsx 效果的时候可以借助路由组来实现。
