export class Thread {
    id: number;
    title: string;
    description: string;
    tags: string[];
    date: string;
}

export class ThreadResponse {
    statusCode: string;
    message: string;
    data: Thread[];
}