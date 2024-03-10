# NER Demo Server

基于 Python FastAPI 框架的 NER Demo 后端。需配合客户端使用。

与应用功能相关的部分已经包含在了实验报告中。这里仅介绍开发相关的内容。

## 安装

建议使用包管理器 Poetry 安装依赖，这也是开发所使用的工具。

确保你的电脑上已经安装了 Python >= 3.12 及 pip，然后运行以下命令安装 Poetry（如果已经安装了 Poetry，可以跳过这一步）。

```bash
pip install poetry
```

然后进入本项目的根目录，运行以下命令即可。

```bash
poetry install
```

## 启动

运行以下命令启动项目：

```bash
poetry run start
```

## 项目结构

项目是一个比较标准的 FastAPI 后端项目，只暴露了一个 `GET /ner` 的接口，负责调用 PyTorch 模型运行 NER 并返回结果。与 PyTorch 相关的代码都在 `model/` 里。

另外这只是个后端，模型训练部分不在这里，这边就负责调用一下训练好的模型而已。

## 其他

本项目使用 Ruff 作为格式化工具和代码检查工具，其配置已写入 `pyproject.toml` 文件中。

你可以使用以下命令格式化代码：

```bash
poetry run ruff format
```

使用以下命令检查代码：

```bash
poetry run ruff check
```
