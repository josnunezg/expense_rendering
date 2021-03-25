import { Resolver, Query } from 'type-graphql';

@Resolver()
class PingResolver {
  @Query(() => String)
  ping(): string {
    return "pong";
  }
}

export default PingResolver;
