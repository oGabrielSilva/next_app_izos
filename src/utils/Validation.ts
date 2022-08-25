class Validation {
  public static isEmail(email: string): boolean {
    if (email.length <= 5 || !email.includes('@') || !email.includes('.')) return false;
    const [beforeAt, afterAt] = email.split('@');
    if (!beforeAt || beforeAt.length <= 1 || !afterAt || afterAt.length < 2) return false;
    const [beforeDot, afterDot] = afterAt.split('.');
    return !!beforeDot && beforeDot.length >= 1 && !!afterDot && afterDot.length > 1;
  }
}

export default Validation;
