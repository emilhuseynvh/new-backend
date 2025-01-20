import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikeEntity } from "src/entity/Like.entity";
import { LikeController } from "./like.controller";
import { LikeService } from "./like.service";

@Module({
    imports: [TypeOrmModule.forFeature([LikeEntity])],
    controllers: [LikeController],
    providers: [LikeService]
})
export class LikeModule { }