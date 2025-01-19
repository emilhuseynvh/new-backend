import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './Category.entity';

@Entity('news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  thumbnail: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.news)
  category: CategoryEntity;

  @BeforeInsert()
  @BeforeUpdate()
  beforeUpsert() {
    if (!this.slug && this.title) {
      const charMap = {
        ə: 'e',
        ü: 'u',
        ş: 's',
        ç: 'c',
        ö: 'o',
        ğ: 'g',
        ı: 'i',
        Ə: 'E',
        Ü: 'U',
        Ş: 'S',
        Ç: 'C',
        Ö: 'O',
        Ğ: 'G',
        I: 'I',
      };

      this.slug = this.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, (match) => charMap[match] || '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
  }
}
