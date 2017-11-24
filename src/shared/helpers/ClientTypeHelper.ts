
export class ClientTypeHelper {
    static get isWeChatMiniProgram(): boolean {
        return (window.__wxjs_environment === 'miniprogram');
    }
}
