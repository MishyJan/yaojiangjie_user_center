import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'yaojiangjie-light-audio',
    templateUrl: './light-audio.component.html',
    styleUrls: ['./light-audio.component.scss']
})
export class LightAudioComponent implements OnInit {
    played: boolean = false;
    diffX: number;
    moveEndX: number;
    index: number = 0;
    startDropX: any;
    progressWidth: string = "0";
    progressTimer: NodeJS.Timer;
    songTimer: NodeJS.Timer;
    currentTime: string = "0 ′ 0";
    isPlay: boolean = true;

    @Input() titleName: string;
    @Input() audioSrc: string;

    @ViewChild('audioEle') audioEle: ElementRef;
    @ViewChild('progressEle') progressEle: ElementRef;
    @ViewChild('dotDropEle') dotDropEle: ElementRef;
    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        this._router.events
            .subscribe(result => {
                // 路由切换完成时，重新初始化播放数据
                if (result instanceof NavigationEnd) {
                    this.initAudio();
                }
            })
    }

    ngAfterViewInit() {
        this.initAudio();
        this.progressDrop();
    }

    initAudio(): void {
        if (this.audioSrc) {
            this.progressWidth = "0";
            this.currentTime = "0 ′ 0"
            this.isPlay = true;
            clearTimeout(this.songTimer);
            clearTimeout(this.progressTimer);
        }
    }

    play(): void {
        this.audioEle.nativeElement.play();
        this.transPlayTime();
        this.progressBar();
        this.isPlay = false;
        this.played = true;
        this.ended();
    }
    pause(): void {
        this.audioEle.nativeElement.pause();
        this.isPlay = true;
        clearTimeout(this.songTimer);
        clearTimeout(this.progressTimer);
    }

    ended(): void {
        this.audioEle.nativeElement.onended = () => {
            this.isPlay = true;
        };
    }

    // 拖动进度悬浮按钮
    progressDrop(): void {
        let dotDropEle = document.getElementById("dotDropEle");
        dotDropEle.addEventListener("touchstart", (e: any) => {
            this.index++;
            e = e || window.event;
            e.cancelBubble = true;
            this.pause();
            if (this.index == 1) {
                this.startDropX = e.changedTouches[0].pageX;
            }
        });
        dotDropEle.addEventListener("touchmove", (e: any) => {
            e = e || window.event;
            e.cancelBubble = true;
            let width = this.progressEle.nativeElement.offsetWidth;
            this.moveEndX = e.changedTouches[0].pageX;
            this.diffX = this.moveEndX - this.startDropX;
            if (this.diffX > 0 && this.diffX < width && this.played) {
                this.progressWidth = this.diffX / width * 100 + "%";
            } else {
                this.progressWidth = "0";
            }
        });
        dotDropEle.addEventListener("touchend", (e: any) => {
            e = e || window.event;
            e.cancelBubble = true;
            this.audioEle.nativeElement.currentTime = this.audioEle.nativeElement.duration / 100 * parseInt(this.progressWidth);
            if (this.played) {
                this.play();
            }
        });
    }

    // 点击进度条
    progressClick(event): void {
        event.cancelBubble = true;
        // event.stopPropagation();
        let width = this.progressEle.nativeElement.offsetWidth;
        let x = event.offsetX;
        this.progressWidth = x / width * 100 + "%";
        this.audioEle.nativeElement.currentTime = this.audioEle.nativeElement.duration / 100 * parseInt(this.progressWidth);
        this.pause();
        this.play();
    }

    transPlayTime(): void {
        this.songTimer = setInterval(() => {
            let currentTime = this.audioEle.nativeElement.currentTime;
            // 整除后向下取整获取分钟
            let min = Math.floor(currentTime / 60);
            // 利用除模获取秒数
            let sec = Math.floor(currentTime % 60);
            this.currentTime = `${min} ′ ${sec}`;
        }, 300);
    }

    progressBar(): void {
        this.progressTimer = setInterval(() => {
            let duration = this.audioEle.nativeElement.duration;
            let currentTime = this.audioEle.nativeElement.currentTime;
            this.progressWidth = currentTime / duration * 100 + "%";
        }, 300);
    }
}
