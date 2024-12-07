import { useReCaptcha } from "vue-recaptcha-v3";

export class RecaptchaAction {
    public static readonly login = new RecaptchaAction("login");
    private constructor(public readonly name: string) {}
}

export default () => {
    let recaptchaInstance = useReCaptcha();
    const executeRecaptcha = async (action: RecaptchaAction) => {
        await recaptchaInstance?.recaptchaLoaded();
        const token = await recaptchaInstance?.executeRecaptcha(action.name);
        return { token };
    };
    return { executeRecaptcha };
};
