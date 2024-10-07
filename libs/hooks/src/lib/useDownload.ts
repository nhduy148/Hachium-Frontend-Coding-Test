import { useCallback, useState } from 'react';

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const downloadFile = useCallback(async (url: string, filename: string) => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { isDownloading, downloadFile, error };
}
