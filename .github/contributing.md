# Shuimo-ui Contributing Guide
------
Hi! Welcome to contribute to Ink UI! Before submitting your contribution, please take a moment to read the following guidelines:

* [Contributor Covenant](https://www.contributor-covenant.org/)
* [Commit Guidelines](#commit-guidelines)
* [Pull Request Guidelines](#pull-request-guidelines)
* [How to Develop](#how-to-develop)

## Commit Guidelines

I usually prefer to keep a whole meaningful `commit` history, so if you think the same,
I suggest you follow the following conventions when committing:

- We use `emoji` to identify the type of `commit`, which helps us understand the purpose of each `commit` better
  - You can refer to [gitmoji](https://gitmoji.dev) for usage
  - Specifically, when upgrading a feature, we prefer to use `🚀` to indicate an upgrade feeling
- We use `[]` to identify the specific scope of changes, such as `[button]`, to better understand the scope of each commit

Here is an example:

```text
🎉 [init] init project
```

Or you can look at the current `commit` history to learn more.

Of course, you can also keep your own `commit` style, then I will merge your `commit` history.

## Pull Request Guidelines

* Please make sure the content you changed has passed the test cases.
* Please describe the changes in detail, considering the uniqueness of `Shuimo UI`, if it's not a bug fix, we prefer to have a prior `issue` discussion to determine the direction of the modification.
* If it involves changes to the documentation, please modify the documentation content accordingly.

## How to Develop

- `Fork` the repository to your own account
- `Clone` your repository to local
- Use `pnpm i` to install dependencies
- Then you can use `playground` for development
  ```shell
  pnpm run dev
  ```
- After development, you need to build first
  ```shell
  pnpm run build
  ```
  Then check the components in `doc` and update the documentation.

Finally, thank you very much for your reading and contribution!

---------

# 水墨UI 贡献指南
------

Hi! 欢迎你对水墨UI做出贡献！在提交你的贡献之前，请花一点时间阅读以下指南：

* [贡献者契约](https://www.contributor-covenant.org/)
* [Commit 指南](#commit指南)
* [Pull Request 指南](#pull-request-指南)
* [如何进行开发](#如何进行开发)

## Commit指南

通常我更愿意留下一整段有意义的`commit`记录，因此我建议如果你也是这么想的，
那么希望你可以在`commit`时可以遵循以下规范：

- 我们使用`emoji`来标识`commit`的类型，这样可以让我们更好的知道每次`commit`的目的
    - 你可以参照[gitmoji](https://gitmoji.dev)来使用
    - 特别的，在升级某个功能的时候，我们会更倾向使用`🚀`来标识，给人一种升级的感觉
- 我们会使用`[]`来标识具体更改了哪个范围的东西，比如`[Button]`，这样可以让我们更好的知道每次commit的范围

以下是一个例子：

```text
🎉 [init] init project
```

亦或者你可以查看现在的`commit`记录来了解更多。

当然，你也可以保持你自己的`commit`风格，那我将会合并你的`commit`记录。

## Pull Request 指南

* 请务必保证您改动的内容通过了测试用例。
* 请尽量详细地描述改动内容，鉴于`水墨ui`的特殊性，如果不是`bug`修复，我们更希望有前置的`issue`讨论以确定修改方向。
* 如果涉及到了文档的变动，请同步修改文档内容。

## 如何进行开发

- 将仓库`fork`到自己的账户下
- `clone`自己的仓库到本地
- 使用`pnpm i`安装依赖
- 然后您可以使用`playground`来进行开发
  ```shell
  pnpm run dev
  ```
- 开发完成后，您需要先build
  ```shell
  pnpm run build
  ```
  然后在`doc`中查看组件，更新文档。

最后，非常感谢您的阅读和贡献！
