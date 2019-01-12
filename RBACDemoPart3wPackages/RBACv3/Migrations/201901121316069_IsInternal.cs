namespace RBACv3.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IsInternal : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.USERS", "IsInternal", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.USERS", "IsInternal");
        }
    }
}
