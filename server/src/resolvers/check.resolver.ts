import { Query, Resolver } from "type-graphql";

@Resolver()
export class CheckResolver{
  @Query(()=>String) 
   check(){
      return "HealthCheck"
   }

}
