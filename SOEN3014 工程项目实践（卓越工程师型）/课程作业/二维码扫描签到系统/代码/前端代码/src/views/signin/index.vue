<template>
  <div class="app-container">
    <div class="block" style="display:inline">
      <el-row :span="24">
        <el-col :span="18">
          签到课程：
          <el-select v-model="pickedLesson" id="selectLesson" :disabled="isSigning" filterable>
            <el-option v-for="lessonOption, lessonIndex in signInLessons" :key="lessonIndex" :value="lessonOption">
              {{ lessonOption }}
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          签到时间：
          <el-select v-model="signinTime" id="selectTime" :disabled="isSigning" filterable>
            <el-option v-for="timeOption, timeIndex in signinPeriod" :key="timeIndex" :value="timeOption">
              {{ timeOption }}
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :span="6">
          <el-button v-if="!isSigning" @click="beginSign">开始签到</el-button>
          <el-button v-else @click="endSign">结束签到</el-button>
        </el-col>
        <el-col :span="10" v-show="isSigning" style="font-size:30px;color:blue;font-weight: 400;">离签到结束还有：{{
            countdownMinute
        }}分钟{{ countdownSecond }}秒</el-col>
        <el-col :span="8">应到人数：{{this.sumOfStu}} 实到人数：{{this.numOfsigninStu}}</el-col>
      </el-row>
    </div>
    <el-row :span="24">
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
      <el-col :span="6">
        <WwLogin @signed="onSigned" v-if="isSigning" />
      </el-col>
    </el-row>
  </div>
</template>
<script src="./signin.ts"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/common.scss';

.qrcodeDiv {
  float: left;
  font-family: 'Times New Roman', Times, serif;
  color: darkblue;
  font-size: 30px;
  font-weight: bold;
  height: 380px;
  line-height: 300px;
}
</style>
