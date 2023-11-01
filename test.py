# -*- coding: utf-8 -*-
import gradio as gr
import os
import openai

# 设置 OpenAI 的 API 密钥
MAX_TOKENS = 4096  # 对话历史的最大 token 数量

# 定义 chatbot 函数
def chatbot(audio,api_key):
    '''
    if api_key == "ibelieve":
        openai.api_key = "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"
    elif api_key.startwith("sk-"):
        openai.api_key=api_key
    else:
        return "不输密码直接用当喵喵慈善家？"
    '''
    global conversation_history
    
    # 将用户输入与对话历史拼接起来作为 ChatGPT 的输入
    input_text = f'{conversation_history}\nUser: {audio}'
    '''
    # 当对话历史 token 数量超过上限时，进行裁剪
    input_tokens = input_text.split()
    if len(input_tokens) > MAX_TOKENS:
        input_text = " ".join(input_tokens[-MAX_TOKENS:])
    
    # 向 ChatGPT 提出请求并获取回答
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=input_text,
        max_tokens=100,
    )
    
    # 从生成的 response 中提取回答文本
    answer = response.choices[0].text.strip()
    '''
    answer=audio
    # 将当前对话历史更新为包含用户输入和回答
    conversation_history += f'\n你: {audio}\n寄屁替酱: {answer}\n'
    conversation_history_html = conversation_history.replace("\n", "<br>")
    
    return answer,conversation_history_html

# 创建 gradio 接口
conversation_history = ""  # 初始化对话历史为空
interface = gr.Interface(fn=chatbot, inputs=["text","text"],outputs=["text","html"])
interface.launch()