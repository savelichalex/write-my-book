/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>

#import "NewcomerScreenViewController.h"
#import "BookOverviewScreenViewController.h"
#import "ChapterEditScreenViewController.h"

@implementation AppDelegate {
  RCTBridge *bridge;
  UIViewController *currentVC;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  
  UIViewController *rootViewController = [[NewcomerScreenViewController alloc] initWithBridge:bridge];
  currentVC = rootViewController;

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)present:(NSString *)screen {
  if ([screen isEqualToString:@"BookOverviewScreen"]) {
    UIViewController *vc = [[BookOverviewScreenViewController alloc] initWithBridge:bridge];
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];
    
    [currentVC presentViewController:nav animated:YES completion:^{
      self->currentVC = nav;
    }];
  }
  if ([screen isEqualToString:@"ChapterEditScreen"]) {
    UIViewController *vc = [[ChapterEditScreenViewController alloc] initWithBridge:bridge];
    [(UINavigationController *)currentVC pushViewController:vc animated:YES];
  }
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
