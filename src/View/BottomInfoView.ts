import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService";
import { PlaybackState } from "../Model/PlaybackStateEnum";

export class BottomInfoView extends View {

    private artistLabel: HTMLElement;
    private titleLabel: HTMLElement;
    private albumLabel: HTMLElement;

    private prevSongButton: HTMLElement;
    private nextSongButton: HTMLElement;
    private stateToggleButton: HTMLElement;
    private stateIcon: HTMLElement;

    private playerService: MusicPlayerService;

    constructor() {
        super('bottomInfoView.html');

        this.playerService = MusicPlayerService.getInstance();
        this.playerService.onChangePlayer(() => this.onChangePlayer());
        this.onChangePlayer();
    }

    private async onChangePlayer() {
        var song = await this.playerService.currentSong();

        this.artistLabel.innerText = song.getArtist();
        this.titleLabel.innerText = song.getTitle();
        this.albumLabel.innerText = song.getAlbum();

        if (await this.playerService.getPlaybackState() != PlaybackState.Playing) {
            this.stateIcon.innerText = 'play_arrow';
        } else {
            this.stateIcon.innerText = 'pause';
        }
    }

    public onLoad(): void {
        this.artistLabel = this.element.querySelector('#info-artist');
        this.titleLabel = this.element.querySelector('#info-title');
        this.albumLabel = this.element.querySelector('#info-album');

        this.prevSongButton = this.element.querySelector('#controls-prev');
        this.nextSongButton = this.element.querySelector('#controls-next');
        this.stateToggleButton = this.element.querySelector('#controls-state');
        this.stateIcon = this.element.querySelector('#state-icon');

        this.prevSongButton.onclick = () => this.playerService.prev();
        this.nextSongButton.onclick = () => this.playerService.next();
        this.stateToggleButton.onclick = () => this.playerService.togglePlaybackState();
    }
    
    public onShow(): void {
        throw new Error("Method not implemented.");
    }

    public onHide(): void {
        throw new Error("Method not implemented.");
    }
}