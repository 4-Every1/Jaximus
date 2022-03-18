import { Body, Controller, Get, Inject, Post, Param, ParseIntPipe, Scope, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Video } from 'src/domain/model/video';
import { CreateVideoUsecase } from 'src/usecase/video/create-video';
import { GetQuestionListPresenter, GetVideoCommentListPresenter } from './video.presenter';
import { CreateVideoCommentUsecase } from 'src/usecase/video/create-video-comment';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetQuestionListUseCases } from 'src/usecase/video/get-questions-list';
import { GetVideoCommentListUseCases } from 'src/usecase/video/get-video-comment-list';

@Controller('/video')
export class VideoController {
  constructor(
    @Inject(CreateVideoUsecase)
    private readonly createVideoUsecase: CreateVideoUsecase,
    @Inject(GetQuestionListUseCases)
    private readonly getQuestionListUsecase: GetQuestionListUseCases,
    @Inject(GetVideoCommentListUseCases)
    private readonly getVideoCommentListUseCases: GetVideoCommentListUseCases,
    @Inject(CreateVideoCommentUsecase)
    private readonly createVideoCommentUsecase: CreateVideoCommentUsecase,
  ) {}

  @Post('/')
  create(userId: number, @Body() request: Video) {
    this.createVideoUsecase.execute(userId, request);
  }

  @Get('/')
  async getQuestionList(): Promise<GetQuestionListPresenter[]> {
    return this.getQuestionListUsecase.execute();
  }

  @Get('/answer/:videoId')
  async getVideoCommentList(@Param('videoId', ParseIntPipe) videoId: number): Promise<GetVideoCommentListPresenter[]> {
    return this.getVideoCommentListUseCases.execute(videoId);
  }

  @Post('/answer')
  @UseInterceptors(FileInterceptor('file'))
  async createVideoComment(@UploadedFile() file, userId: number, @Body() request: Video) {
    await this.createVideoCommentUsecase.execute(userId, request);
    return { status: 201, message: 'success' };
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  videoFile(@UploadedFile() file) {
    return { url: file.location };
  }
}
