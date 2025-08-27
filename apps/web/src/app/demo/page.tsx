'use client';

import { useState, useCallback } from 'react';
import ErrorAlert from '@/components/ErrorAlert';
import ResultCard from '@/components/ResultCard';
import { parseResetSeconds } from '@/lib/format';
import { uploadUnsignedToCloudinary } from '@/lib/cloudinary';
import ColorBgPicker from '@/components/ColorBgPicker';
import ColorBgPreview from '@/components/ColorBgPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image as ImageIcon, 
  Download, 
  Link as LinkIcon,
  Sparkles,
  CheckCircle,
  X,
  RefreshCw
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

interface ProcessedImage {
  url: string;
  url_webp: string;
  url_jpg: string;
  url_png: string;
  url_thumb: string;
  width: number;
  height: number;
  bytes: number;
  latency_ms: number;
  rb_limit_remaining: string;
  color_variants?: Array<{ hex: string; url: string }>;
  public_id?: string;
}

export default function DemoPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<{
    kind: 'CREDITS' | 'RATE_LIMIT' | 'GENERIC';
    message?: string;
    resetSeconds?: number;
  } | null>(null);
  const [colorHex, setColorHex] = useState('#FFFFFF');
  const [gradientUrl, setGradientUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Dosya boyutu kontrolü (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Dosya boyutu 10MB\'dan küçük olmalıdır');
        return;
      }

      // Dosya tipi kontrolü - sadece belirli formatlar
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Sadece JPG, PNG, WebP, HEIC formatları kabul edilir');
        return;
      }

      setUploadedFile(file);
      setImageUrl('');
      setError(null);
      toast.success('Görsel yüklendi!');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/heic': ['.heic']
    },
    multiple: false
  });

  const processImage = async () => {
    if (!imageUrl && !uploadedFile) {
      toast.error('Lütfen bir görsel yükleyin veya URL girin');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setProcessedImage(null);

    try {
      let finalImageUrl = imageUrl;

      // Eğer dosya yüklendiyse, önce Cloudinary'ye yükle
      if (uploadedFile) {
        try {
          setProgress(30);
          const cloudinaryResult = await uploadUnsignedToCloudinary(uploadedFile);
          finalImageUrl = cloudinaryResult.secure_url;
          setProgress(60);
          toast.success('Dosya Cloudinary\'ye yüklendi!');
        } catch (uploadError) {
          const errorMessage = uploadError instanceof Error ? uploadError.message : 'Cloudinary yükleme hatası';
          setError(errorMessage);
          toast.error(errorMessage);
          setIsProcessing(false);
          setProgress(0);
          return;
        }
      }

      // Progress simulation (Cloudinary yükleme sonrası)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // N8N webhook'u çağır
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: finalImageUrl,
          fileName: uploadedFile?.name || 'image'
        }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      // Normalize edilmiş payload'u her durumda oku
      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload || payload.ok === false) {
        const kind = (payload?.kind as 'CREDITS' | 'RATE_LIMIT' | 'GENERIC') || 'GENERIC';
        const msg = payload?.data?.rb_error_message || payload?.data?.message ||
          (kind === 'CREDITS' ? 'Kredi yetersiz.' : kind === 'RATE_LIMIT' ? 'Oran limiti aşıldı.' : 'İşlem başarısız.');
        const resetSeconds = kind === 'RATE_LIMIT' ? parseResetSeconds(payload?.data?.rb_limit_reset) : undefined;
        setApiError({ kind, message: msg, resetSeconds });
        setError(null);
        toast.error(msg);
        return;
      }

      setApiError(null);
      setProcessedImage(payload.data);
      toast.success('Arka plan başarıyla kaldırıldı!');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const resetDemo = () => {
    setImageUrl('');
    setUploadedFile(null);
    setProcessedImage(null);
    setError(null);
    setApiError(null);
    setColorHex('#FFFFFF');
    setGradientUrl(null);
    setProgress(0);
  };

  const downloadImage = (url: string, format: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `portreva-${format}-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${format.toUpperCase()} formatında indirildi!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Portreva</span>
          </div>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={resetDemo}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sıfırla
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Canlı Demo
            </h1>
            <p className="text-xl text-gray-300">
              AI destekli arka plan kaldırma teknolojisini deneyimleyin
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Görsel Yükle</CardTitle>
                <CardDescription className="text-gray-300">
                  Dosya yükleyin veya URL girin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/20 hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-primary">Dosyayı buraya bırakın...</p>
                  ) : (
                    <div>
                      <p className="text-white mb-2">Dosyayı sürükleyin veya tıklayın</p>
                      <p className="text-gray-400 text-sm">
                        JPG, PNG, WebP (Maksimum 10MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-white">Veya URL girin</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setImageUrl('')}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Uploaded File Info */}
                {uploadedFile && (
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <ImageIcon className="w-8 h-8 text-primary" />
                    <div className="flex-1">
                      <p className="text-white font-medium">{uploadedFile.name}</p>
                      <p className="text-gray-400 text-sm">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Process Button */}
                <Button
                  onClick={processImage}
                  disabled={isProcessing || (!imageUrl && !uploadedFile)}
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-lg py-6"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      İşleniyor...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Arka Planı Kaldır
                    </>
                  )}
                </Button>

                {/* Progress */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>İşleniyor...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Error */}
                {apiError && (
                  <ErrorAlert
                    kind={apiError.kind}
                    message={apiError.message}
                    resetSeconds={apiError.resetSeconds}
                    onRetry={() => processImage()}
                    onGoBilling={() => { window.location.href = '/pricing'; }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card className="glass-dark border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Sonuç</CardTitle>
                <CardDescription className="text-gray-300">
                  İşlenmiş görsel ve indirme seçenekleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResultCard data={processedImage || undefined} />
                
                {/* Color Background Section */}
                {processedImage?.url_png && (
                  <section className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold text-white">Color Background</h3>
                    <p className="text-sm text-white/80">
                      Renk seçin; Cloudinary dönüşümü ile arka plan rengi anında uygulanır.
                    </p>
                    <ColorBgPicker 
                      value={colorHex} 
                      onChange={setColorHex}
                      onGradientChange={setGradientUrl}
                    />
                    <ColorBgPreview 
                      transparentUrl={processedImage.url_png} 
                      colorHex={colorHex}
                      gradientUrl={gradientUrl}
                      width={processedImage.width}
                      height={processedImage.height}
                      overlayPublicId={processedImage.public_id}
                    />
                  </section>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-16 text-center">
            <Card className="glass-dark border-white/10 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Nasıl Çalışır?
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <p className="text-white/90">Görsel yükleyin veya URL girin</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <p className="text-white/90">AI teknolojisi ile işleyin</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <p className="text-white/90">Sonucu indirin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


