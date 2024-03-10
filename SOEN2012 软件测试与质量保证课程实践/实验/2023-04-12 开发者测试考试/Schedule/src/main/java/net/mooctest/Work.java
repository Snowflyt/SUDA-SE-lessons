package net.mooctest;

public class Work {
    /** 作业名 */
    private String name;
    /** 作业到达时间 */
    private int arrivalTime;
    /** 作业服务时间 */
    private int serviceTime;
    /** 开始执行时间 */
    private int beginTime;
    /** 完成时间 */
    private int endTime;
    /** 作业是否调入系统 */
    private boolean in = false;

    /**
     * 作业已调入
     */
    public void setIn() {
        this.in = true;
    }

    /**
     * 判断作业是否已调入系统
     * 
     * @return
     */
    public boolean isIn() {
        return this.in;
    }

    /**
     * Constructor
     * 
     * @param name
     * @param t1
     * @param t2
     */
    public Work(String name, int t1, int t2) {
        this.name = name;
        this.arrivalTime = t1;
        this.serviceTime = t2;
    }

    /**
     * 设置开始执行时间
     * 
     * @param t
     */
    public void setBeginTime(int t) {
        this.beginTime = t;
    }

    /**
     * 获取开始时间
     * 
     * @return
     */
    public int getBeginTime() {
        return this.beginTime;
    }

    /**
     * 设置完成时间
     * 
     * @param t
     */
    public void setEndTime(int t) {
        this.endTime = t;
    }

    /**
     * 获取结束时间
     * 
     * @return
     */
    public int getEndTime() {
        return this.endTime;
    }

    /**
     * 计算“周转时间”=完成时间-到达时间
     * 
     * @return int
     */
    public int getCircleTime() {
        return this.endTime - this.arrivalTime;
    }

    /**
     * 计算“带权周转时间”=周转时间/服务时间
     * 
     * @return
     */
    public double getCircleWPTime() {

        return ((double) getCircleTime()) / this.serviceTime;
    }

    /**
     * 计算"响应比"=（等待时间+要求服务时间）/要求服务时间=响应时间/要求服务时间
     * 
     * @return
     */
    public int getPriority() {
        // TODO

        return 0;
    }

    /**
     * 获取到达时间
     * 
     * @return
     */
    public int getArrivalTime() {
        return this.arrivalTime;
    }

    /**
     * 获取服务时间
     * 
     * @return
     */
    public int getServiceTime() {
        return this.serviceTime;
    }
}