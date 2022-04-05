import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Comment } from 'src/domain/model/comment';
import { CommentRepository } from 'src/domain/repositories/comment.repository';

export class GetTextAnswerUseCase {
  constructor(private readonly commentRepository: CommentRepository, private readonly exceptionService: IException) {}

  async execute(questionId: number, page: number, size: number): Promise<Comment[]> {
    const textAnswer = await this.commentRepository.findTextAnswer(questionId, page, size);
    if (textAnswer.length === 0) throw this.exceptionService.textAnswerNotFoundException();
    return textAnswer;
  }
}
