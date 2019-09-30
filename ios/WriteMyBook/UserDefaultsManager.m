//
//  UserDefaultsManager.m
//  WriteMyBook
//
//  Created by Алексей Савельев on 30/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "UserDefaultsManager.h"

@implementation UserDefaultsManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(save:(NSString *)json) {
  [[NSUserDefaults standardUserDefaults] setObject:json forKey:@"Book"];
}

RCT_EXPORT_METHOD(getBook:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *json = [[NSUserDefaults standardUserDefaults] stringForKey:@"Book"];
  resolve(json);
}

@end
