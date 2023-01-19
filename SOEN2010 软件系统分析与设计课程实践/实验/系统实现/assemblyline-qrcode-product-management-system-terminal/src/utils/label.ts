import QRCode from 'qrcode'

export function drawQrCode (canvas: HTMLCanvasElement, id: number) {
  QRCode.toCanvas(canvas, id.toString(), {
    errorCorrectionLevel: 'H',
    width: 200
  })
}

export function drawDateTime (canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = '20px Arial'
  ctx.fillText(new Date().toLocaleString(), 10, 20)
}
