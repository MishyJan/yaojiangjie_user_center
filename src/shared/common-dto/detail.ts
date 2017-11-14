export class Detail {
    name: string;
    desc: ExhibitsIntro;
    voice: string;
    images: string[];
    choice: Choice;
}

export class Choice {
    desc: string;
    item: string[];
}

export class ExhibitsIntro {
    title: string;
    text: string;
}
