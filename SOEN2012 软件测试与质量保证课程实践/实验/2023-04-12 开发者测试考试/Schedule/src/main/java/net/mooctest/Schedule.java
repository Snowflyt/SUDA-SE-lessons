package net.mooctest;

import java.util.ArrayList;
import java.util.List;

public class Schedule {

	public List<Double> FCFS(List<Work> works) {
		double avgCircleTime = 0;
		double avgCircleTimeWP = 0;
		List<Double> lst = new ArrayList<Double>();
		for (int i = 0; i < works.size(); i++) {
			// works.get(i).getArrivalTime();
			// works.get(i).getServiceTime();
			if (i != 0) {
				works.get(i).setBeginTime(works.get(i - 1).getEndTime());
			} else {
				works.get(i).setBeginTime(works.get(i).getArrivalTime());
			}
			works.get(i)
					.setEndTime(
							works.get(i).getBeginTime()
									+ works.get(i).getServiceTime());
			avgCircleTime += works.get(i).getCircleTime();
			avgCircleTimeWP += works.get(i).getCircleWPTime();
		}
		avgCircleTime /= works.size();
		avgCircleTimeWP /= works.size();
		lst.add(avgCircleTime);
		lst.add(avgCircleTimeWP);
		return lst;
	}

	/**
	 * 改后的短作业优先调度算法
	 * 
	 * @param works
	 * @return
	 */
	public List<Double> SJF(List<Work> works) {
		List<Double> lst = new ArrayList<Double>();
		double avgCircleTime = 0;
		double avgCircleTimeWP = 0;
		List<Work> ins = new ArrayList<Work>();
		int i = 0;
		int counter = 0; // 已完成作业的计数器
		// 判断是否已经把所有的作业都处理完毕
		while (counter < works.size()) {
			// 找到所有未执行，且到达时间小于i的作业
			for (int j = 0; j < works.size(); j++) {
				if (works.get(j).isIn())
					continue;
				if (works.get(j).getArrivalTime() <= i) {
					ins.add(works.get(j));
				}
			}
			if (ins.isEmpty()) {
				i++;
			} else {
				ins = sortByServiceTime(ins);
				// 将当前已到达的作业中，服务时间最短的作业加入到CPU执行
				Work now = ins.get(0);
				now.setBeginTime(i);
				now.setEndTime(now.getBeginTime() + now.getServiceTime());
				now.setIn(); // 标记作业已调度
				counter++;
				i = now.getEndTime(); // 更新当前时间
				ins.clear(); // 清空临时数组ins
			}

		}
		for (int m = 0; m < works.size(); m++) {
			avgCircleTime += works.get(m).getCircleTime();
			avgCircleTimeWP += works.get(m).getCircleWPTime();
		}
		avgCircleTime = avgCircleTime / works.size();
		avgCircleTimeWP = avgCircleTimeWP / works.size();
		lst.add(avgCircleTime);
		lst.add(avgCircleTimeWP);
		return lst;
	}

	/**
	 * 对加入到系统中的作业依据服务时间多少进行排序<BR>
	 * 然后直接返回
	 * 
	 * @param ins
	 * @return ins
	 */
	public static List<Work> sortByServiceTime(List<Work> ins) {
		for (int i = 0; i < ins.size(); i++) {
			for (int j = i + 1; j < ins.size(); j++) {
				Work aw = ins.get(i);
				int a = aw.getServiceTime();
				Work bw = ins.get(j);
				int b = bw.getServiceTime();
				if (a >= b) {
					ins.remove(j);
					ins.add(i, bw);
				}
			}
		}
		return ins;
	}
}