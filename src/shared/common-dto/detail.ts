export class Detail {
    name: string;
    desc: string;
    voice: string;
    images: string[];
    choice: Choice;
}

export class Choice {
    desc: string;
    item: string[];
}
