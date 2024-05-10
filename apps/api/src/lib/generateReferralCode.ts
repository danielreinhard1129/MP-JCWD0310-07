export function generateRefferalCode() {
    const randomLength: number = Math.floor(Math.random() * 4) + 4;
    const chars =
      'zyxwvutsrqponmlkjihgfedcbaABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let reffCode = '';
    for (let i = 0; i < randomLength; i++) {
      const randomIdx = Math.floor(Math.random() * chars.length);
      reffCode += chars[randomIdx];
    }
  
    return {
      code: reffCode,
    };
  }