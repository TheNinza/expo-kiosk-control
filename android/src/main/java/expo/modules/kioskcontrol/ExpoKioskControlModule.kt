package expo.modules.kioskcontrol

import android.annotation.SuppressLint
import android.app.ActivityManager
import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoKioskControlModule : Module() {
  private val canExitByUnpinning: Boolean
    get() = getPreferences().getBoolean("canExitByUnpinning", false)

  private val context: Context
    get() = requireNotNull(appContext.reactContext)

  private val currentActivity: android.app.Activity
    get() = requireNotNull(appContext.currentActivity)

  private val activityManager: ActivityManager
    get() = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager

  private val isLockTaskModeRunning: Boolean
    @SuppressLint("ObsoleteSdkInt")
    get() {
      return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        activityManager.lockTaskModeState ==
                ActivityManager.LOCK_TASK_MODE_LOCKED
                || activityManager.lockTaskModeState ==
                ActivityManager.LOCK_TASK_MODE_PINNED
      } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        // Deprecated in API level 23.
        activityManager.isInLockTaskMode
      } else {
        false
      }
    }


  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }



  override fun definition() = ModuleDefinition {

    Name("ExpoKioskControl")

    Function("exitKioskMode") {
      currentActivity.stopLockTask()
    }

    Function("startKioskMode") {
      currentActivity.startLockTask()
    }

    Function("onRecentButtonPressed") {
      if (!canExitByUnpinning) {
        activityManager.moveTaskToFront(currentActivity.taskId, 0)
        currentActivity.startLockTask()
      }
    }

    Function("enableExitByUnpinning") {
      getPreferences().edit().putBoolean("canExitByUnpinning", true).apply()
    }

    Function("disableExitByUnpinning") {
      getPreferences().edit().putBoolean("canExitByUnpinning", false).apply()
    }

    Function("checkIfKioskEnabled") {
      return@Function isLockTaskModeRunning
    }
  }
}
