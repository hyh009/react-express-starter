export class HealthService {
  public async getHealthStatus() {
    // 這裡未來可以加入資料庫或 Redis 的連線檢查
    return { status: 'ok' };
  }
}

export const healthService = new HealthService();
