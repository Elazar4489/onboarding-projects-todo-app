export class TodoItem {
    constructor(
        public id: number,
        public title: string,
        public completed: boolean = false,
    ) {}

    // toggle(): void {
    //     this.completed = !this.completed;
    // }
}