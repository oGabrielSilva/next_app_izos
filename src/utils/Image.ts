class ImageController {
  public static resizeBase64(base64: string | null, size: number) {
    return new Promise((resolve) => {
      if (base64) {
        const img = document.createElement('img');
        img.src = base64;
        img.onload = (e) => {
          const target = e.target! as HTMLImageElement;
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const context = canvas.getContext('2d')!;
          context.drawImage(target, 0, 0, canvas.width, canvas.height);
          resolve(context.canvas.toDataURL());
        };
      } else resolve(null);
    });
  }
}

export default ImageController;
