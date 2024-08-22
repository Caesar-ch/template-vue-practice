export function formatTime(seconds) {
  
  // 确保输入是数字并且不小于0
  if (typeof seconds !== 'number' || seconds < 0) {
      return "00:00";
  }

  // 计算分钟和剩余的秒数
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // 将分钟和秒数格式化为两位数
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}