import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NewsEntity } from "./News.entity";
import { UserEntity } from "./User.entity";

@Entity('like')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => NewsEntity, (news) => news.likes)
    news: NewsEntity;

    @ManyToOne(() => UserEntity, (user) => user.likes)
    user: UserEntity;
}