import { VideoTypeOrmEntity } from 'src/infrastructure/entities/video.entity';
import { CreateVideoAnswerDto } from 'src/presentation/answer/answer.dto';
import { GetAnswerCountPresenter } from 'src/presentation/question/get-answer-count.presenter';
import { CreateQuestionDto } from 'src/presentation/question/question.dto';
import { Video } from '../model/video';

export interface VideoRepository {
  save(video: CreateQuestionDto, userId: number): Promise<VideoTypeOrmEntity>;
  findQuestionList(userId: number, page: number, size: number): Promise<Video[]>;
  findVideoAnswerList(questionId: number, userId: number, page: number, size: number): Promise<Video[]>;
  findQuestionDetail(userId: number, videoId: number): Promise<Video>;
  findQuestionVideoList(videoIds: number[], userId: number): Promise<Video[]>;
  findVideoOwnerId(id: number): Promise<{ id: number }>;
  findVideoOwner(videoId: number): Promise<{ userId: number }>;
  findAnswerCount(videoId: number): Promise<GetAnswerCountPresenter>;
  createVideoAnswer(request: CreateVideoAnswerDto, userId: number, question: number): Promise<void>;
  videoAdoption(videoId: number, userId: number): Promise<void>;
  userQuestionList(userId: number, page: number, size: number): Promise<Video[]>;
  userAnswerList(userId: number, page: number, size: number): Promise<Video[]>;
  deleteVideo(videoId: number): Promise<void>;
  findOne(id: number): Promise<Video>;
  findUsersQuestion(videoId: number, userId: number): Promise<Video>;
  findUsersVideo(videoId: number, userId: number): Promise<Video>;
  findVideoAnswerDetail(videoId: number, userId: number): Promise<Video>;
  checkVideoAnswer(videoId: number): Promise<Video>;
  checkAdoption(questionId: number);
  isMine(questionId: number, userId: number);
}
