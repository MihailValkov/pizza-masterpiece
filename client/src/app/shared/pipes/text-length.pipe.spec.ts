import { TextLengthPipe } from './text-length.pipe';

describe('TextLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new TextLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
