// MIT © 2017 azu
import { SourceRepo } from "../../domain/SourceRepo/SourceRepo";
import { NullableRepository } from "ddd-base";

export class SourceRepoRepository extends NullableRepository<SourceRepo> {}

export const sourceRepoRepository = new SourceRepoRepository();
