#!/bin/zsh

set -u

PROJECT_DIR="$(cd -- "$(dirname -- "$0")" && pwd)"
LOCAL_URL="http://localhost:3000"

cd "$PROJECT_DIR" || exit 1

if ! command -v npm >/dev/null 2>&1; then
  echo "没有找到 npm。请先安装 Node.js，再重新双击此文件。"
  echo
  read -r "?按回车键关闭窗口……"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "项目依赖尚未安装。请先在此文件夹运行：npm install"
  echo
  read -r "?按回车键关闭窗口……"
  exit 1
fi

echo "正在启动“知与行”……"
echo "本地地址：$LOCAL_URL"
echo "关闭此终端窗口或按 Control + C 即可停止。"
echo

(
  for attempt in {1..60}; do
    if curl -fsS "$LOCAL_URL" >/dev/null 2>&1; then
      open "$LOCAL_URL"
      exit 0
    fi
    sleep 1
  done
) &

npm run dev
exit_code=$?

if [ "$exit_code" -ne 0 ]; then
  echo
  echo "网站未能启动，请检查上方错误信息。"
  read -r "?按回车键关闭窗口……"
fi

exit "$exit_code"
