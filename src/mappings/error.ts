/**
 * 유효성 에러
 */
export class ValidError extends Error {
    constructor(message: Error['message']) {
        super(message);

        this.name = 'ValidError';
    }
}
