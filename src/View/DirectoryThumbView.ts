import { Directory } from "../Model/Directory";
import { View } from "./View";
import { MusicPlayerService } from "../Services/MusicPlayerService";

export class DirectoryThumbView extends View {

    private titleLabel: HTMLElement;
    private mainContainer: HTMLElement;

    private directory: Directory;

    constructor(dir: Directory) {
        super('directoryThumb.html');

        this.directory = dir;
    }

    public getDirectory() {
        return this.directory;
    }

    public async onLoad() {
        this.titleLabel = this.element.querySelector('#directory-title');
        this.mainContainer = this.element;

        this.titleLabel.innerText = this.directory.path;

        this.directory.getThumbnailOrDefault().then(url => {
            url = this.fileUri(url);
            this.mainContainer.style.background = `url(${url})`;
        });

        this.mainContainer.onclick = async () => {
            var playerService = MusicPlayerService.getInstance();

            await playerService.clearPlaylist();
            await playerService.addToPlaylist(this.directory);
            playerService.play();
        }
    }

    public onShow(): void {
    }

    public onHide(): void {
    }
}