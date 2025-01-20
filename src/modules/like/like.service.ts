import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LikeEntity } from "src/entity/Like.entity";
import { Repository } from "typeorm";
import { GetLike } from "./dto/get-like.dto";

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(LikeEntity)
        private likeRepo: Repository<LikeEntity>
    ) { }

    async getById(userId: number, params: GetLike) {
        const result = await this.likeRepo.find({
            where: {
                user: { id: userId },
                news: { id: params.id }
            },
            relations: ['user', 'news']
        });

        return result;
    }
}