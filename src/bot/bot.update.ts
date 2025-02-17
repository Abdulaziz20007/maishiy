import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "./bot.service";
import { StuffService } from "./stuff.service";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Stuff } from "./models/staff.model";
import { AdminService } from "./admin.service";

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly stuffService: StuffService,
    private readonly adminService: AdminService,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Stuff) private readonly stuffModel: typeof Stuff
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const guest_id = ctx.from?.id;
    const findUser = await this.userModel.findByPk(guest_id);
    const findStuff = await this.stuffModel.findByPk(guest_id);
    if (findUser) {
      await this.botService.startUser(ctx);
    } else if (findStuff) {
      await this.stuffService.startStuff(ctx);
    } else {
      await this.botService.start(ctx);
    }
  }

  @Command("admin")
  async onStop(@Ctx() ctx: Context) {
    await this.adminService.admin(ctx);
  }

  @Hears(["👤 Mijoz", "👨‍🔧 Usta"])
  async onSelectRole(@Ctx() ctx: Context) {
    const who = ctx.text;
    const guest_id = ctx.from?.id;
    const findUser = await this.userModel.findByPk(guest_id);
    const findStuff = await this.stuffModel.findByPk(guest_id);
    if (findUser) {
      await this.botService.startUser(ctx);
    } else if (findStuff) {
      await this.stuffService.startStuff(ctx);
    } else {
      if (who == "👤 Mijoz") {
        await this.botService.startUser(ctx);
      } else if (who == "👨‍🔧 Usta") {
        await this.stuffService.startStuff(ctx);
      }
    }
  }

  @Hears("👤 Ism")
  async onSearchName(@Ctx() ctx: Context) {
    this.botService.onSearchName(ctx);
  }

  @Hears("⭐️ Reyting")
  async onRatingMenu(@Ctx() ctx: Context) {
    this.botService.onRating(ctx);
  }

  @Hears("📍 Lokatsiya")
  async onSearchLocation(@Ctx() ctx: Context) {
    this.botService.onSearchLocation(ctx);
  }

  @Hears("🏠 Asosiy menyu")
  async onMainMenuUser(@Ctx() ctx: Context) {
    this.botService.startUser(ctx);
  }

  @Hears("Mening Reytingim ⭐️")
  async onStuffRating(@Ctx() ctx: Context) {
    this.stuffService.stuffRating(ctx);
  }

  @Hears("📑 Buyurtmalar")
  async onSelectedService(@Ctx() ctx: Context) {
    this.botService.selectedServices(ctx);
  }

  @Hears("Asosiy menyu 🏠")
  async onMainMenuStuff(@Ctx() ctx: Context) {
    this.stuffService.startStuff(ctx);
  }
  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    const stuff_id = ctx.from?.id;
    const stuff = await this.stuffModel.findByPk(stuff_id);

    const user_id = ctx.from?.id;
    const user = await this.userModel.findByPk(user_id);

    if (user) {
      await this.botService.onContactUser(ctx);
    }
    if (stuff) {
      await this.stuffService.onContactStuff(ctx);
    }
  }

  @Action(/^ser/)
  async onService(@Ctx() ctx: Context) {
    await this.stuffService.onClickedService(ctx);
  }

  @Action(/^back_to_times/)
  async onBack(@Ctx() ctx: Context) {
    await this.stuffService.onCheckTime(ctx);
  }

  @Action(/^book/)
  async onBooking(@Ctx() ctx: Context) {
    await this.botService.onBooking(ctx);
  }

  @Action(/^cl/)
  async onUserService(@Ctx() ctx: Context) {
    await this.botService.onClickedService(ctx);
  }

  @Action([/^confirmStuff/, /^cancelStuff/])
  async onCheckStuff(@Ctx() ctx: Context) {
    await this.adminService.checkStuff(ctx);
  }

  @Action([/^confirmOrder_/, /^cancelOrder_/])
  async onConfirmOrder(@Ctx() ctx: Context) {
    this.botService.onOccupyTime(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    const stuff_id = ctx.from?.id;
    const stuff = await this.stuffModel.findByPk(stuff_id);
    const user_id = ctx.from?.id;
    const user = await this.userModel.findByPk(user_id);
    if (user) {
      await this.botService.onLocation(ctx);
    }
    if (stuff) {
      await this.stuffService.onLocation(ctx);
    }
  }

  @Action(/^start_/)
  async onStartTime(@Ctx() ctx: Context) {
    await this.stuffService.onClickedStartTime(ctx);
  }

  @Action(/^end_/)
  async onEndTime(@Ctx() ctx: Context) {
    await this.stuffService.onClickedEndTime(ctx);
  }

  @Action(/^rate/)
  async onRate(@Ctx() ctx: Context) {
    await this.botService.onClickRate(ctx);
  }
  @Action(/^rating_/)
  async onRating(@Ctx() ctx: Context) {
    await this.botService.onClickedRating(ctx);
  }

  @Action(/^loc/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.botService.onClickLocation(ctx);
  }

  @Action(/^lastbook/)
  async onClickBooking(@Ctx() ctx: Context) {
    await this.botService.onClickBooking(ctx);
  }

  @Action(/^stepdate_(\d{4})-(\d{2})-(\d{2})_(\d+)$/)
  async onClickBookingDate(@Ctx() ctx: Context) {
    await this.botService.onClickedDateBooking(ctx);
  }

  @Action(/^avg_/)
  async onSpendTime(@Ctx() ctx: Context) {
    await this.stuffService.onClickedSpendTime(ctx);
  }

  @Action(/^date_(\d{4})-(\d{2})-(\d{2})_(\d+)$/)
  async onSelectDay(@Ctx() ctx: Context) {
    await this.stuffService.onSelectDate(ctx);
  }

  @Action(/^time_(\d{2}:\d{2})_(\d+)$/)
  async onClickedTime(@Ctx() ctx: Context) {
    await this.stuffService.onClickedTime(ctx);
  }

  @Action(/^steptime_(\d{2}:\d{2})_(\d+)$/)
  async onClickedBookingTime(@Ctx() ctx: Context) {
    await this.botService.onClickedBookingTime(ctx);
  }

  @Action([/^status_free/, /^status_busy/])
  async onOccupyTime(@Ctx() ctx: Context) {
    await this.stuffService.onOccupyTime(ctx);
  }

  @Action([/^stepstatus/])
  async onOccupyMasterTime(@Ctx() ctx: Context) {
    await this.botService.onOccupyMasterTime(ctx);
  }

  @Action("check")
  async onCheck(@Ctx() ctx: Context) {
    await this.stuffService.onCheck(ctx);
  }

  @Hears("⏰ Ish vaqti")
  async onCheckTime(@Ctx() ctx: Context) {
    await this.stuffService.onCheckTime(ctx);
  }

  @Hears("👥 Mijozlar")
  async onCheckClients(@Ctx() ctx: Context) {
    await this.stuffService.onCheckClients(ctx);
  }

  @Hears("🔧 Xizmatlar")
  async onServices(@Ctx() ctx: Context) {
    await this.botService.onService(ctx);
  }

  @Action(["confirm", "cancel"])
  async onConfirm(@Ctx() ctx: Context) {
    await this.stuffService.onConfirm(ctx);
  }

  // @Command("stop")
  // async onStop(@Ctx() ctx: Context) {
  //   await this.botService.onStop(ctx);
  // }
  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.stuffService.onText(ctx);
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log("Kutilmagan xabar");
  }
}
