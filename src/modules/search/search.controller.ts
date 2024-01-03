import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators';
import { Role } from '@enums/role.enum';
import { AuthGuard } from '@guards/auth.guard';

@Controller('search')
@ApiBearerAuth()
@Roles(Role.ADMIN, Role.GUEST, Role.USER)
@UseGuards(AuthGuard)
@ApiTags('Search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':query')
  search(@Param('query') query: string) {
    return this.searchService.search(query);
  }
}
