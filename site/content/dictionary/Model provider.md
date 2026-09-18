# Model provider · 模型供应商

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Model%20provider.md)

为 <em>inference</em> 供给 <em>model</em> 的一方。通常是远程服务(Anthropic、OpenAI、Google),也可以是本地——Ollama、LM Studio、llama.cpp 跑在你自己的机器上。<em>Harness</em> 自己不跑模型;它向 provider 请求。

机器在 provider 手里:<em>parameters</em> 存放在它的硬件上,每次 <em>model provider request</em> 都是 harness 把 <em>token</em> 送过网络、换回预测。这使 provider 成为一整类常被错怪到模型或 harness 头上的问题的源头——限速、容量降级、停机都住在这里;<em>agent</em> 在 <em>session</em> 中途卡住、或每个 <em>turn</em> 都报错时,provider 的状态页值得第一个看。商业条款也是它定的:<em>input</em>/<em>output tokens</em> 的单价、<em>prefix cache</em> 的折扣、以及到底有哪些模型可用。注意 provider 和模型的缔造者可以是两家公司——Bedrock、Vertex、OpenRouter 服务的都是别人家的模型。本地 provider 用能力换控制:装得进你自己硬件的模型远小于前沿模型,但什么都不会离开这台机器,也没有按 token 计的账单。

**Usage**

"Can we run this offline for the air-gapped client?"  
「物理隔离的那个客户,我们能离线跑吗?」

"Swap the model provider to a local one — Ollama or llama.cpp on their box. The harness doesn't care, it just hits a different endpoint."  
「把 model provider 换成本地的——他们机器上的 Ollama 或 llama.cpp。harness 不在乎,无非是换个端点。」

