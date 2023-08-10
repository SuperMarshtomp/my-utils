import { JSEncrypt } from 'jsencrypt';

export const RSAEncrypt = (value: any, publicKey: string) => {
  const encryptTool = new JSEncrypt();
  encryptTool.setPublicKey(publicKey);
  const encryptVlue = encryptTool.encrypt(value) as string;
  return encryptVlue;
};

export default RSAEncrypt;
