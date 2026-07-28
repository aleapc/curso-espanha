# Gera os ícones PWA do "Shuō!" (mandarim de sobrevivência pra viajar):
# fundo terracota, a palavra "shuō" em creme e uma barra dourada — que aqui é a
# MARCA DO 1º TOM (o traço plano do ō). Paleta herdada do template por enquanto.
# Rode com Windows PowerShell:  powershell.exe -NoProfile -File scripts/make-icons.ps1
Add-Type -AssemblyName System.Drawing
$dir = Join-Path (Split-Path $PSScriptRoot -Parent) "static"

$TERRA = [System.Drawing.Color]::FromArgb(255, 200, 75, 49)    # #C84B31
$CREAM = [System.Drawing.Color]::FromArgb(255, 255, 247, 236)  # #FFF7EC
$GOLD  = [System.Drawing.Color]::FromArgb(255, 236, 179, 101)  # #ECB365

# "shuō" sem depender de encoding do arquivo (ō = U+014D)
$WORD = "shu" + [char]0x014D

function Add-Pill($path, $x, $y, $w, $h) {
  $r = $h / 2.0
  $d = 2 * $r
  $path.AddArc($x, $y, $d, $d, 90, 180)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 180)
  $path.CloseFigure()
}

function New-Icon([int]$size, [string]$file, [double]$artScale) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear($TERRA)

  $cx = $size / 2.0
  $cy = $size / 2.0

  # palavra "shuō" em creme, ajustada pra caber ~84% da largura útil
  $target = $size * 0.84 * $artScale
  $fontSize = $size * 0.32 * $artScale
  do {
    if ($font) { $font.Dispose() }
    $font = New-Object System.Drawing.Font("Segoe UI", [single]$fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $m = $g.MeasureString($WORD, $font)
    if ($m.Width -le $target) { break }
    $fontSize = $fontSize * 0.93
  } while ($fontSize -gt 8)

  $cream = New-Object System.Drawing.SolidBrush $CREAM
  $tx = $cx - $m.Width / 2.0
  $ty = ($cy - $size * 0.05 * $artScale) - $m.Height / 2.0
  $g.DrawString($WORD, $font, $cream, [single]$tx, [single]$ty)

  # barra dourada = marca do 1º tom (traço plano), abaixo da palavra
  $barW = $size * 0.44 * $artScale
  $barH = $size * 0.085 * $artScale
  $bx = $cx - $barW / 2.0
  $by = $cy + $size * 0.22 * $artScale - $barH / 2.0
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  Add-Pill $path $bx $by $barW $barH
  $gold = New-Object System.Drawing.SolidBrush $GOLD
  $g.FillPath($gold, $path)

  $path.Dispose(); $gold.Dispose(); $cream.Dispose(); $font.Dispose(); $g.Dispose()
  $bmp.Save((Join-Path $dir $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "  OK $file"
}

New-Icon 512 "icon-512.png" 1.0
New-Icon 192 "icon-192.png" 1.0
New-Icon 512 "icon-512-maskable.png" 0.70   # arte em 70% (safe zone maskable)
New-Icon 180 "apple-touch-icon.png" 1.0      # iOS home screen
Write-Host "Icons done."
