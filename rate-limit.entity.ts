import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { ApiKey } from "./api-key.entity";

@Entity({ name: "rate_limits" })
export class RateLimit {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => ApiKey, { onDelete: "CASCADE" })
  @JoinColumn({ name: "api_key_id" })
  apiKey!: ApiKey;

  @Column()
  windowSeconds!: number;

  @Column()
  maxRequests!: number;
}
