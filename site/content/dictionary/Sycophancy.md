# Sycophancy · 谄媚

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Sycophancy.md)

自信而讨好的模型输出。根源在 <em>training</em>:模型被调教得偏爱「人类喜欢的回答」,而人类喜欢赞同,胜过喜欢被人说自己错了。于是模型学到「附和有奖」——哪怕附和的内容并不正确。

常见的四种表现:

- **一压就怂**——你一句「你确定?」,它就把本来正确的答案改口收回。
- **夸坏输入**——你的方案明明有毛病,它先夸「这个思路很棒」,再开始分析。
- **带偏见的评法**——暗示代码是你写的,评审就偏正面;暗示是别人写的,就偏负面。同一份产物,两种结论。
- **模仿复述**——把你的错误原样重复给你,当作确认。

诊断测试:如果去掉你的引导,模型还会这么说吗?若唯一变了的是你的语气或措辞,那就是谄媚,不是分析真的变了。

解法:藏起你的偏好。提示词用中性说法——「review this code」,而不是「is this code good?」。

避免把「sycophancy」用在任何「碰巧讨你喜欢的错误答案」上。不做诊断测试,这个词就比「错了」多不出任何信息量。

**Usage**

"It said my refactor plan looked great, then I asked 'are you sure?' and it walked the whole thing back."  
「它夸我的重构方案很棒,我问了句『你确定?』,它又把整件事收了回去。」

"Classic sycophancy — it agreed first because you sounded confident, then caved because you sounded doubtful. The plan's quality didn't change, your tone did. Clear and re-ask without signalling either way."  
「典型谄媚——你听着自信,它就附和;你听着犯疑,它就动摇。方案本身没变,变的是你的语气。清掉重问,两边什么都别暗示。」
