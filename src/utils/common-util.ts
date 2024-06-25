import { customAlphabet } from 'nanoid';
const nanoNumeric = customAlphabet('1234567890');
const nanoAlphabet = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

export default class CommonUtil {
    static deepClone(source: any, defaultValue?: any): any {
        if (!source && typeof source !== 'object') {
            throw new Error('error arguments');
        }
        const targetObj: any | any[] = source.constructor === Array ? [] : {};
        for (const keys in source) {
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && source[keys] instanceof Date) {
                    // 追加 Date 包装类复制功能
                    targetObj[keys] = new Date(source[keys].valueOf());
                } else if (source[keys] && typeof source[keys] === 'object') {
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = CommonUtil.deepClone(source[keys]);
                } else {
                    targetObj[keys] = source[keys];
                }
            }
        }
        if (defaultValue === undefined) {
            return targetObj;
        } else {
            for (const k in targetObj) {
                if (k) {
                    targetObj[k] = defaultValue;
                }
            }
            return targetObj;
        }
    }

    /**
     * 随机数字字符串
     * @param len
     */
    static randomNumeric(len: number = 4): string {
        return nanoNumeric(len);
    }

    /**
     * 随机字母
     * @param len
     */
    static randomAlphabet(len: number = 4): string {
        return nanoAlphabet(len);
    }
}
