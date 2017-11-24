export class WeChatShareInputDto {
    sourceUrl: string;
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
}

export class WeChatShareResultDto {
    result: boolean;
    target: string;
    shareUrl: string;
}


export class JsApiSignatureInput {
    sourceUrl: string;
    nonceStr: string;
    timestamp: string;
}
